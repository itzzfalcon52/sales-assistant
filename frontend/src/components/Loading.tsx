interface LoadingProps {
    text?: string;
  }
  
  export default function Loading({
    text = "Loading...",
  }: LoadingProps) {
    return (
      <div className="flex min-h-48 items-center justify-center">
  
        <div className="flex items-center gap-3">
  
          <span className="loading-spinner" />
  
          <span className="text-sm text-slate-400">
            {text}
          </span>
  
        </div>
  
      </div>
    );
  }