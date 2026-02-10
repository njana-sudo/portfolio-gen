import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming this exists, or use standard button

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const email = user.emailAddresses[0]?.emailAddress;

    if (email) {
        // Try to find user in DB
        const [dbUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (dbUser) {
            redirect(`/portfolio/${dbUser.username}`);
        }
    }

    // User logged in but no portfolio found
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-neutral-900">
            <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-neutral-700">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome, {user.firstName || "User"}!
                </h1>

                <p className="text-gray-600 dark:text-gray-300">
                    We couldn't find a portfolio associated with your email
                    <span className="font-semibold block mt-1 text-sm text-gray-800 dark:text-gray-200">{email}</span>
                </p>

                <div className="pt-4">
                    <p className="text-sm text-gray-500 mb-4">
                        To get started, please upload your resume on the home page.
                    </p>

                    <Link href="/">
                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors w-full">
                            Create Portfolio
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
