import { Head, Link, usePage } from '@inertiajs/react';

interface FormSubmission {
    id: number;
    data: Record<string, unknown>;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
}

interface FormEndpoint {
    id: number;
    endpoint_key: string;
    name: string;
    description: string | null;
    created_at: string;
    submissions: FormSubmission[];
}

interface Props {
    endpoint: FormEndpoint;
    [key: string]: unknown;
}

export default function EndpointDetail() {
    const { endpoint } = usePage<Props>().props;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const formatValue = (value: unknown): string => {
        if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value, null, 2);
        }
        return String(value);
    };

    return (
        <>
            <Head title={`${endpoint.name} - Submissions`} />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 dark:from-gray-900 dark:to-gray-800">
                <div className="mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <Link
                                    href={route('home')}
                                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
                                >
                                    ← Back to Endpoints
                                </Link>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                📊 {endpoint.name}
                            </h1>
                            {endpoint.description && (
                                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                                    {endpoint.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Endpoint Info */}
                    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Endpoint Information
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">URL:</span>
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
                                <span>📊 {endpoint.submissions.length} total submissions</span>
                                <span>📅 Created {new Date(endpoint.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Submissions */}
                    <div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                            Form Submissions ({endpoint.submissions.length})
                        </h2>

                        {endpoint.submissions.length === 0 ? (
                            <div className="rounded-lg bg-white p-8 text-center shadow-sm dark:bg-gray-800">
                                <div className="mb-4 text-6xl">📭</div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    No submissions yet
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Submissions to this endpoint will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {endpoint.submissions.map((submission, index) => (
                                    <div
                                        key={submission.id}
                                        className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Submission #{endpoint.submissions.length - index}
                                            </h3>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                📅 {new Date(submission.created_at).toLocaleString()}
                                            </div>
                                        </div>

                                        {/* Form Data */}
                                        <div className="mb-4">
                                            <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                                                Form Data:
                                            </h4>
                                            <div className="space-y-2">
                                                {Object.entries(submission.data).map(([key, value]) => (
                                                    <div
                                                        key={key}
                                                        className="flex flex-col gap-1 rounded bg-gray-50 p-3 dark:bg-gray-700"
                                                    >
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            {key}:
                                                        </span>
                                                        <span className="text-gray-900 dark:text-white">
                                                            {formatValue(value)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Metadata */}
                                        <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                                            <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                                                Metadata:
                                            </h4>
                                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                                {submission.ip_address && (
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium">IP Address:</span> {submission.ip_address}
                                                    </div>
                                                )}
                                                {submission.user_agent && (
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        <span className="font-medium">User Agent:</span>{' '}
                                                        <span className="truncate">{submission.user_agent}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Example Usage */}
                    <div className="mt-12 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                            📝 Example HTML Form for this Endpoint
                        </h2>
                        <pre className="rounded bg-gray-100 p-4 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200 overflow-x-auto">
{`<form action="${window.location.origin}/submit/${endpoint.endpoint_key}" method="POST">
  <!-- Add your form fields here -->
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <textarea name="message" placeholder="Your Message" rows="4"></textarea>
  
  <!-- Submit button -->
  <button type="submit">Submit Form</button>
</form>`}
                        </pre>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                            Copy this HTML and customize the form fields for your needs. All submissions will be captured automatically.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}