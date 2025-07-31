import { type SharedData } from '@/types';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

interface FormEndpoint {
    id: number;
    endpoint_key: string;
    name: string;
    description: string | null;
    submissions_count: number;
    created_at: string;
}

interface Props extends SharedData {
    endpoints: FormEndpoint[];
    flash?: {
        success?: string;
    };
    [key: string]: unknown;
}

export default function Welcome() {
    const { auth, endpoints, flash } = usePage<Props>().props;
    const [showCreateForm, setShowCreateForm] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('endpoints.store'), {
            onSuccess: () => {
                reset();
                setShowCreateForm(false);
            }
        });
    };

    const deleteEndpoint = (id: number) => {
        if (confirm('Are you sure you want to delete this endpoint? All submissions will be lost.')) {
            router.delete(route('endpoints.destroy', id));
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    return (
        <>
            <Head title="📝 Form Collector">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-6xl">
                    {/* Header */}
                    <header className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                                📝 Form Collector
                            </h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                                Create unique endpoints for your HTML forms and capture submissions instantly
                            </p>
                        </div>
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                            {flash.success}
                        </div>
                    )}

                    {/* Features Section */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <div className="mb-4 text-3xl">🔗</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                Unique Endpoints
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Generate secure, unique URLs for each of your forms
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <div className="mb-4 text-3xl">📊</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                Data Collection
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Automatically capture and store all form submissions
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <div className="mb-4 text-3xl">👀</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                Easy Viewing
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                View and manage all your form submissions in one place
                            </p>
                        </div>
                    </div>

                    {/* Create New Endpoint */}
                    <div className="mb-8">
                        {!showCreateForm ? (
                            <button
                                onClick={() => setShowCreateForm(true)}
                                className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition-colors"
                            >
                                ➕ Create New Form Endpoint
                            </button>
                        ) : (
                            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New Form Endpoint
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            placeholder="Contact Form"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            placeholder="Form for collecting contact information"
                                            rows={3}
                                        />
                                        {errors.description && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                                        >
                                            {processing ? 'Creating...' : 'Create Endpoint'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowCreateForm(false);
                                                reset();
                                            }}
                                            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Existing Endpoints */}
                    <div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                            Your Form Endpoints ({endpoints.length})
                        </h2>
                        
                        {endpoints.length === 0 ? (
                            <div className="rounded-lg bg-white p-8 text-center shadow-sm dark:bg-gray-800">
                                <div className="mb-4 text-6xl">📭</div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    No endpoints yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Create your first form endpoint to start collecting submissions!
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {endpoints.map((endpoint) => (
                                    <div
                                        key={endpoint.id}
                                        className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {endpoint.name}
                                                </h3>
                                                {endpoint.description && (
                                                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                                                        {endpoint.description}
                                                    </p>
                                                )}
                                                <div className="mt-3 space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            Endpoint URL:
                                                        </span>
                                                        <code className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                                            {window.location.origin}/submit/{endpoint.endpoint_key}
                                                        </code>
                                                        <button
                                                            onClick={() => copyToClipboard(`${window.location.origin}/submit/${endpoint.endpoint_key}`)}
                                                            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
                                                            title="Copy to clipboard"
                                                        >
                                                            📋
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                        <span>📊 {endpoint.submissions_count} submissions</span>
                                                        <span>📅 Created {new Date(endpoint.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex gap-2">
                                                <Link
                                                    href={route('endpoints.show', endpoint.id)}
                                                    className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                                                >
                                                    View Submissions
                                                </Link>
                                                <button
                                                    onClick={() => deleteEndpoint(endpoint.id)}
                                                    className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* How to Use Section */}
                    <div className="mt-12 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                            🚀 How to Use
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-400">
                            <div className="flex gap-3">
                                <span className="font-bold text-indigo-600">1.</span>
                                <span>Create a new form endpoint above</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="font-bold text-indigo-600">2.</span>
                                <span>Copy the generated endpoint URL</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="font-bold text-indigo-600">3.</span>
                                <span>Set your HTML form's action attribute to the endpoint URL</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="font-bold text-indigo-600">4.</span>
                                <span>All form submissions will be automatically captured and stored</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Example HTML Form:</h3>
                            <pre className="rounded bg-gray-100 p-3 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
{`<form action="${window.location.origin}/submit/YOUR_ENDPOINT_KEY" method="POST">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <textarea name="message" placeholder="Your Message"></textarea>
  <button type="submit">Submit</button>
</form>`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}