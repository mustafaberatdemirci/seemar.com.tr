export interface Slab {
    id: number;
    name: string;
    slug: string;  // SEO-friendly URL slug
    quarry: string;
    image: string;
    type: string;
}

export interface Project {
    id: number;
    name: string;
    category: string;
    image: string;
    description?: string;
    longDescription?: string;
    location?: string;
    year?: number;
    materials?: string[];
    images?: string[];
    client?: string;
    featured?: boolean;
}

export interface NavLink {
    label: string;
    href: string;
}

export interface Job {
    id: number;
    title: string;
    category: string; // Department
    location: string;
    type: string;
    icon: string;
    description: string; // Short description for list
    level?: string;
    longDescription?: string;
    responsibilities?: string[];
    qualifications?: string[];
    teamDescription?: string;
    teamImage?: string;
}