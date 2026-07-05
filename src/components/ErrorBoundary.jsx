import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      if (this.props.mini) {
        return (
          <div className="p-4 rounded-xl border border-rose-100 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/10 text-center text-xs w-full">
            <p className="font-semibold text-rose-600 dark:text-rose-400">Failed to load content</p>
            <button 
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-2 text-[10px] font-bold text-gray-500 dark:text-gray-400 underline hover:text-rose-500"
            >
              Retry
            </button>
          </div>
        );
      }

      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-100 font-sans transition-colors duration-200">
          <div className="max-w-md w-full text-center bg-gray-50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-xl">
            <svg
              className="w-16 h-16 text-rose-500 mx-auto mb-5 stroke-[1.5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <h1 className="text-xl font-bold mb-3">Something went wrong</h1>
            <p className="text-sm text-gray-500 dark:text-neutral-400 mb-6">
              We apologize for the inconvenience. The application encountered an unexpected error.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-rose-500 hover:bg-rose-600 active:scale-98 text-white font-semibold rounded-xl shadow-md transition duration-150"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
