import React, { useState, useRef, useCallback, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface FlipbookViewerProps {
    pdfUrl: string;
    onLoadSuccess?: (numPages: number) => void;
    onLoadError?: (error: Error) => void;
}

// Individual page component - renders at 2x quality for sharpness
const FlipbookPage = React.forwardRef<HTMLDivElement, { pageNumber: number; width: number; height: number }>(
    ({ pageNumber, width, height }, ref) => {
        // Render at 2x for retina quality
        const scale = 2;

        return (
            <div
                ref={ref}
                className="flipbook-page bg-white"
                style={{ width, height, overflow: 'hidden' }}
            >
                <Page
                    pageNumber={pageNumber}
                    width={width * scale}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    className="pdf-page-render"
                />
            </div>
        );
    }
);

FlipbookPage.displayName = 'FlipbookPage';

const FlipbookViewer: React.FC<FlipbookViewerProps> = ({ pdfUrl, onLoadSuccess, onLoadError }) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [zoom, setZoom] = useState<number>(1);
    const [baseWidth, setBaseWidth] = useState<number>(400);
    const [baseHeight, setBaseHeight] = useState<number>(566);

    // Pan state for left-click drag
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

    // Mobile detection for single-page portrait mode
    const [isMobile, setIsMobile] = useState(false);

    const flipBookRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const flipbookAreaRef = useRef<HTMLDivElement>(null);
    const flipSoundRef = useRef<HTMLAudioElement | null>(null);

    // Initialize flip sound
    useEffect(() => {
        flipSoundRef.current = new Audio('/sounds/turn.mp3');
        flipSoundRef.current.volume = 0.3;
    }, []);

    // Mobile detection for portrait mode
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mouse wheel zoom
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (flipbookAreaRef.current?.contains(e.target as Node)) {
                e.preventDefault();
                const zoomDelta = e.deltaY > 0 ? -0.15 : 0.15;
                setZoom(prev => {
                    const newZoom = Math.max(1, Math.min(2.5, prev + zoomDelta));
                    if (newZoom === 1) setPanOffset({ x: 0, y: 0 });
                    return newZoom;
                });
            }
        };
        document.addEventListener('wheel', handleWheel, { passive: false });
        return () => document.removeEventListener('wheel', handleWheel);
    }, []);

    // Pinch-to-zoom for mobile
    const initialPinchDistance = useRef<number | null>(null);
    const initialPinchZoom = useRef<number>(1);

    useEffect(() => {
        const flipbookArea = flipbookAreaRef.current;
        if (!flipbookArea) return;

        const getDistance = (touches: TouchList) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                initialPinchDistance.current = getDistance(e.touches);
                initialPinchZoom.current = zoom;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 2 && initialPinchDistance.current !== null) {
                e.preventDefault();
                const currentDistance = getDistance(e.touches);
                const scale = currentDistance / initialPinchDistance.current;
                const newZoom = Math.max(1, Math.min(2.5, initialPinchZoom.current * scale));
                setZoom(newZoom);
                if (newZoom === 1) setPanOffset({ x: 0, y: 0 });
            }
        };

        const handleTouchEnd = () => {
            initialPinchDistance.current = null;
        };

        flipbookArea.addEventListener('touchstart', handleTouchStart, { passive: false });
        flipbookArea.addEventListener('touchmove', handleTouchMove, { passive: false });
        flipbookArea.addEventListener('touchend', handleTouchEnd);

        return () => {
            flipbookArea.removeEventListener('touchstart', handleTouchStart);
            flipbookArea.removeEventListener('touchmove', handleTouchMove);
            flipbookArea.removeEventListener('touchend', handleTouchEnd);
        };
    }, [zoom]);

    // Left-click drag for panning when zoomed
    const handleMouseDown = (e: React.MouseEvent) => {
        // Only left mouse button and only when zoomed
        if (e.button === 0 && zoom > 1) {
            e.preventDefault();
            setIsPanning(true);
            setPanStart({
                x: e.clientX - panOffset.x,
                y: e.clientY - panOffset.y
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning && zoom > 1) {
            e.preventDefault();
            const maxPan = (zoom - 1) * 350;
            const newX = Math.max(-maxPan, Math.min(maxPan, e.clientX - panStart.x));
            const newY = Math.max(-maxPan, Math.min(maxPan, e.clientY - panStart.y));
            setPanOffset({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const handleMouseLeave = () => {
        setIsPanning(false);
    };

    // Double-click to toggle zoom
    const handleDoubleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (zoom > 1) {
            setZoom(1);
            setPanOffset({ x: 0, y: 0 });
        } else {
            setZoom(1.8);
        }
    };

    // Calculate dimensions based on PDF aspect ratio and device
    const calculateBaseDimensions = useCallback((pdfWidth: number, pdfHeight: number) => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const containerHeight = containerRef.current.offsetHeight - 120;
            const aspectRatio = pdfHeight / pdfWidth;
            const mobile = window.innerWidth < 768;

            let pageWidth: number;
            let pageHeight: number;

            if (mobile) {
                // Mobile: Single page, use more width
                pageWidth = Math.min(containerWidth - 40, 350);
                pageHeight = pageWidth * aspectRatio;

                const maxHeight = containerHeight * 0.8;
                if (pageHeight > maxHeight) {
                    pageHeight = maxHeight;
                    pageWidth = pageHeight / aspectRatio;
                }
            } else {
                // Desktop: Two-page spread
                const isLandscape = pdfWidth > pdfHeight;

                if (isLandscape) {
                    const maxHeight = containerHeight * 0.85;
                    pageHeight = Math.min(maxHeight, 480);
                    pageWidth = pageHeight / aspectRatio;

                    const maxPageWidth = (containerWidth / 2) - 50;
                    if (pageWidth > maxPageWidth) {
                        pageWidth = maxPageWidth;
                        pageHeight = pageWidth * aspectRatio;
                    }
                } else {
                    pageWidth = Math.min((containerWidth / 2) - 60, 420);
                    pageHeight = pageWidth * aspectRatio;

                    const maxHeight = containerHeight * 0.85;
                    if (pageHeight > maxHeight) {
                        pageHeight = maxHeight;
                        pageWidth = pageHeight / aspectRatio;
                    }
                }
            }

            setBaseWidth(Math.floor(pageWidth));
            setBaseHeight(Math.floor(pageHeight));
        }
    }, []);

    const onDocumentLoadSuccess = useCallback(async (pdf: any) => {
        setNumPages(pdf.numPages);

        try {
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1 });
            calculateBaseDimensions(viewport.width, viewport.height);
        } catch (e) {
            console.log('Could not get page dimensions');
        }

        setIsLoading(false);
        onLoadSuccess?.(pdf.numPages);
    }, [onLoadSuccess, calculateBaseDimensions]);

    const onDocumentLoadError = useCallback((error: Error) => {
        setError('PDF yüklenemedi. Lütfen tekrar deneyin.');
        setIsLoading(false);
        onLoadError?.(error);
    }, [onLoadError]);

    const onFlip = useCallback((e: any) => {
        setCurrentPage(e.data + 1);
        // Reset pan on page flip
        setPanOffset({ x: 0, y: 0 });
        // Play flip sound
        if (flipSoundRef.current) {
            flipSoundRef.current.currentTime = 0;
            flipSoundRef.current.play().catch(() => { });
        }
    }, []);

    const goToPrevPage = () => flipBookRef.current?.pageFlip()?.flipPrev();
    const goToNextPage = () => flipBookRef.current?.pageFlip()?.flipNext();
    const goToFirstPage = () => flipBookRef.current?.pageFlip()?.flip(0);
    const goToLastPage = () => flipBookRef.current?.pageFlip()?.flip(numPages - 1);

    const zoomIn = () => setZoom(prev => Math.min(prev + 0.4, 2.5));
    const zoomOut = () => {
        setZoom(prev => {
            const newZoom = Math.max(prev - 0.4, 1);
            if (newZoom === 1) setPanOffset({ x: 0, y: 0 });
            return newZoom;
        });
    };
    const resetZoom = () => {
        setZoom(1);
        setPanOffset({ x: 0, y: 0 });
    };

    const toggleFullscreen = () => {
        if (containerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                containerRef.current.requestFullscreen();
            }
        }
    };

    const pages = Array.from({ length: numPages }, (_, i) => i + 1);
    const isZoomed = zoom > 1;

    return (
        <div
            ref={containerRef}
            className="flipbook-container relative w-full flex flex-col items-center bg-gradient-to-b from-anthracite to-cinematic-black rounded-lg overflow-hidden select-none"
            style={{ height: '75vh', minHeight: '600px' }}
        >
            {/* Loading */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-cinematic-black/95 z-20">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-white/80 font-display text-sm">Katalog yükleniyor...</span>
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-cinematic-black/95 z-20">
                    <div className="text-center px-8">
                        <span className="material-symbols-outlined text-6xl text-red-400 mb-4 block">error</span>
                        <p className="text-white text-lg mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-primary text-anthracite text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
                        >
                            Tekrar Dene
                        </button>
                    </div>
                </div>
            )}

            {/* Hidden PDF Document for loading */}
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                className="hidden"
            />

            {/* Flipbook Area */}
            {numPages > 0 && (
                <div
                    ref={flipbookAreaRef}
                    className="flex-grow flex items-center justify-center w-full overflow-hidden py-6"
                    style={{
                        cursor: isZoomed ? (isPanning ? 'grabbing' : 'grab') : 'default'
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onDoubleClick={handleDoubleClick}
                >
                    <div
                        className="flipbook-wrapper"
                        style={{
                            transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
                            transformOrigin: 'center center',
                            transition: isPanning ? 'none' : 'transform 0.25s ease-out'
                        }}
                    >
                        <Document file={pdfUrl} loading={null}>
                            <HTMLFlipBook
                                ref={flipBookRef}
                                width={baseWidth}
                                height={baseHeight}
                                size="fixed"
                                minWidth={baseWidth}
                                maxWidth={baseWidth}
                                minHeight={baseHeight}
                                maxHeight={baseHeight}
                                showCover={true}
                                mobileScrollSupport={false}
                                onFlip={onFlip}
                                className="flipbook-shadow"
                                style={{}}
                                startPage={0}
                                drawShadow={true}
                                flippingTime={500}
                                usePortrait={isMobile}
                                startZIndex={0}
                                autoSize={false}
                                maxShadowOpacity={0.5}
                                showPageCorners={!isZoomed}
                                disableFlipByClick={true}
                                swipeDistance={30}
                                clickEventForward={false}
                                useMouseEvents={!isZoomed}
                            >
                                {pages.map((pageNum) => (
                                    <FlipbookPage
                                        key={pageNum}
                                        pageNumber={pageNum}
                                        width={baseWidth}
                                        height={baseHeight}
                                    />
                                ))}
                            </HTMLFlipBook>
                        </Document>
                    </div>
                </div>
            )}

            {/* Zoom hint */}
            {isZoomed && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-xs font-display flex items-center gap-2 z-10">
                    <span className="material-symbols-outlined text-sm">pan_tool</span>
                    Sol tık basılı tutup sürükleyin • Çift tık ile sıfırlayın
                </div>
            )}

            {/* Controls */}
            {numPages > 0 && (
                <div className="w-full bg-anthracite/95 backdrop-blur-sm border-t border-white/10 py-3 px-4">
                    <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
                        {/* Navigation */}
                        <button
                            onClick={goToFirstPage}
                            disabled={currentPage <= 1 || isZoomed}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-anthracite disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            title="İlk Sayfa"
                        >
                            <span className="material-symbols-outlined text-lg">first_page</span>
                        </button>

                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage <= 1 || isZoomed}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-anthracite disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            title="Önceki Sayfa"
                        >
                            <span className="material-symbols-outlined text-xl">chevron_left</span>
                        </button>

                        <div className="px-3 py-1.5 bg-white/10 rounded-full text-white font-mono text-sm min-w-[70px] text-center">
                            <span className="text-primary font-bold">{currentPage}</span>
                            <span className="mx-1 opacity-50">/</span>
                            <span>{numPages}</span>
                        </div>

                        <button
                            onClick={goToNextPage}
                            disabled={currentPage >= numPages || isZoomed}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-anthracite disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            title="Sonraki Sayfa"
                        >
                            <span className="material-symbols-outlined text-xl">chevron_right</span>
                        </button>

                        <button
                            onClick={goToLastPage}
                            disabled={currentPage >= numPages || isZoomed}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-anthracite disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            title="Son Sayfa"
                        >
                            <span className="material-symbols-outlined text-lg">last_page</span>
                        </button>

                        <div className="w-px h-7 bg-white/20 mx-1 hidden md:block"></div>

                        {/* Zoom */}
                        <button
                            onClick={zoomOut}
                            disabled={zoom <= 1}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-anthracite disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            title="Uzaklaştır"
                        >
                            <span className="material-symbols-outlined text-lg">zoom_out</span>
                        </button>

                        <button
                            onClick={resetZoom}
                            className={`px-2 py-1 rounded-full font-mono text-xs transition-all min-w-[50px] ${isZoomed
                                ? 'bg-primary text-anthracite'
                                : 'bg-white/10 text-white hover:bg-primary hover:text-anthracite'
                                }`}
                            title="Zoom Sıfırla"
                        >
                            {Math.round(zoom * 100)}%
                        </button>

                        <button
                            onClick={zoomIn}
                            disabled={zoom >= 2.5}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-anthracite disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            title="Yakınlaştır"
                        >
                            <span className="material-symbols-outlined text-lg">zoom_in</span>
                        </button>

                        <div className="w-px h-7 bg-white/20 mx-1 hidden md:block"></div>

                        {/* Actions */}
                        <button
                            onClick={toggleFullscreen}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-anthracite transition-all"
                            title="Tam Ekran"
                        >
                            <span className="material-symbols-outlined text-lg">fullscreen</span>
                        </button>

                        <a
                            href={pdfUrl}
                            download="seemar-catalog-2024.pdf"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-anthracite transition-all"
                            title="PDF İndir"
                        >
                            <span className="material-symbols-outlined text-lg">download</span>
                        </a>
                    </div>

                    {/* Hint */}
                    <p className="text-center text-white/40 text-xs mt-2">
                        {isZoomed
                            ? 'Sol tık basılı tutup sürükleyin • Çift tık ile sıfırlayın'
                            : 'Sayfaları sürükleyerek çevirin • Scroll ile zoom • Çift tık ile yakınlaştır'
                        }
                    </p>
                </div>
            )}

            <style>{`
                .flipbook-shadow {
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
                }
                .flipbook-page {
                    background: white;
                }
                .pdf-page-render canvas {
                    width: 100% !important;
                    height: auto !important;
                    display: block;
                }
                .flipbook-container:fullscreen {
                    height: 100vh !important;
                    background: linear-gradient(to bottom, #1a1a1c, #0a0a0c);
                }
                .flipbook-wrapper {
                    will-change: transform;
                }
            `}</style>
        </div>
    );
};

export default FlipbookViewer;
