
import React, { Component, ErrorInfo, ReactNode } from "react";
import { withTranslation, WithTranslation } from "react-i18next";

interface Props extends WithTranslation {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg text-center max-w-md">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              {this.props.t('errorBoundary.title')}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {this.props.t('errorBoundary.message')}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {this.props.t('errorBoundary.reload')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
