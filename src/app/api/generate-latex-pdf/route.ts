import { NextRequest, NextResponse } from 'next/server';

interface ResumeData {
    personalInfo: {
        name: string;
        contact: string;
        summary?: string;
    };
    experience: Array<{
        title: string;
        company: string;
        duration: string;
        responsibilities: string[];
    }>;
    education: Array<{
        degree: string;
        institution: string;
        duration: string;
        details?: string;
    }>;
    skills: string[];
}

function generateLatexTemplate(data: ResumeData): string {
    const escapeLaTeX = (text: string) => {
        return text
            .replace(/\\/g, '\\textbackslash{}')
            .replace(/[&%$#_{}]/g, '\\$&')
            .replace(/~/g, '\\textasciitilde{}')
            .replace(/\^/g, '\\textasciicircum{}');
    };

    const name = escapeLaTeX(data.personalInfo.name);
    const contact = escapeLaTeX(data.personalInfo.contact);
    const summary = data.personalInfo.summary ? escapeLaTeX(data.personalInfo.summary) : '';

    const experienceSection = data.experience.map(exp => `
\\textbf{${escapeLaTeX(exp.title)}} \\hfill \\textit{${escapeLaTeX(exp.duration)}}\\\\
\\textit{${escapeLaTeX(exp.company)}}
\\begin{itemize}[leftmargin=*,noitemsep,topsep=3pt]
${exp.responsibilities.map(resp => `    \\item ${escapeLaTeX(resp)}`).join('\n')}
\\end{itemize}
\\vspace{4pt}
`).join('\n');

    const educationSection = data.education.map(edu => `
\\textbf{${escapeLaTeX(edu.institution)}}\\\\
${escapeLaTeX(edu.degree)} \\hfill \\textit{${escapeLaTeX(edu.duration)}}
${edu.details ? `\\\\\n${escapeLaTeX(edu.details)}` : ''}
\\vspace{4pt}
`).join('\n');

    const skillsSection = data.skills.map(skill => escapeLaTeX(skill)).join(' $\\bullet$ ');

    return `\\documentclass[11pt,a4paper,sans]{moderncv}
\\moderncvstyle{banking}
\\moderncvcolor{blue}
\\usepackage[utf8]{inputenc}
\\usepackage[scale=0.85]{geometry}
\\usepackage{enumitem}

\\name{${name}}{}
\\phone{${contact}}

\\begin{document}

\\makecvtitle

${summary ? `\\section{Professional Summary}\n${summary}\n\n` : ''}

\\section{Professional Experience}
${experienceSection}

\\section{Education}
${educationSection}

\\section{Skills \\& Expertise}
${skillsSection}

\\end{document}`;
}

export async function POST(request: NextRequest) {
    try {
        const resumeData: ResumeData = await request.json();

        // Generate LaTeX template
        const latexContent = generateLatexTemplate(resumeData);

        // Compile using LaTeX.Online API
        const response = await fetch('https://latexonline.cc/compile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                text: latexContent,
                command: 'pdflatex',
            }),
        });

        if (!response.ok) {
            throw new Error(`LaTeX compilation failed: ${response.statusText}`);
        }

        const pdfBuffer = await response.arrayBuffer();

        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="resume.pdf"',
            },
        });
    } catch (error) {
        console.error('LaTeX PDF generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
