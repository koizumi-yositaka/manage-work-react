interface ErrorStateProps {
  error: Error;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500">エラー: {error.message}</div>
    </div>
  );
};
