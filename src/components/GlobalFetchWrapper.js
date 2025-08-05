"use client"
import useGlobalEmployeeFetch from "@/hooks/useGlobalEmployeeFetch"

export default function GlobalFetchWrapper(){
    useGlobalEmployeeFetch();
    return null;
}