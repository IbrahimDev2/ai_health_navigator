
import { Suspense } from 'react';
import PasswordResetForm from './PasswordResetForm';

// ShadCN UI Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AuthActionPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Suspense fallback={
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Loading...</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>Please wait while we verify the link.</p>
          </CardContent>
        </Card>
      }>
        <PasswordResetForm />
      </Suspense>
    </div>
  );
};

export default AuthActionPage;
