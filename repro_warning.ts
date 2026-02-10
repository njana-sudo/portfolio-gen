
import { Octokit } from "octokit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import PDFParser from "pdf2json";
import fs from "fs";

console.log("Starting reproduction script...");

try {
    console.log("Testing Octokit...");
    const octokit = new Octokit({ auth: "dummy" });
    // access something to trigger potential lazy loads
    const _ = octokit.rest.users;
} catch (e) { console.error("Octokit error", e); }

try {
    console.log("Testing Gemini...");
    const genAI = new GoogleGenerativeAI("dummy");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
} catch (e) { console.error("Gemini error", e); }

try {
    console.log("Testing Groq...");
    const groq = new Groq({ apiKey: "dummy" });
} catch (e) { console.error("Groq error", e); }

try {
    console.log("Testing pdf2json...");
    // pdf2json is a class constructor
    const pdfParser = new PDFParser();
} catch (e) { console.error("pdf2json error", e); }

console.log("Finished reproduction script.");
