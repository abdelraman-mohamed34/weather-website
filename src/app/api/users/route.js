// /api/users

import { NextResponse } from "next/server";

const heroes = [
    { id: 1, name: "Iron Man", power: "High-tech suit", universe: "Marvel" },
    { id: 2, name: "Spider-Man", power: "Spider sense & agility", universe: "Marvel" },
    { id: 3, name: "Batman", power: "Intelligence & gadgets", universe: "DC" },
    { id: 4, name: "Superman", power: "Super strength & flight", universe: "DC" },
    { id: 5, name: "Wonder Woman", power: "Amazonian warrior", universe: "DC" },
];

export async function GET() {
    return NextResponse.json(heroes);
}

export async function POST(req) {
    const body = await req.json()
    try {
        const newHero = {
            id: heroes.length + 1,
            ...body,
        };
        heroes.push(newHero)
        return NextResponse.json(newHero, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
}