
import React, { ReactNode } from 'react';

interface ScreenContainerProps {
  children: ReactNode;
  className?: string;
}

// React Native의 SafeAreaView와 View 스타일을 웹에서 흉내낸 컨테이너
export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex-1 w-full h-full overflow-hidden flex flex-col ${className}`}>
      <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth p-4 md:p-6 pb-24 md:pb-6">
        <div className="max-w-7xl mx-auto w-full animate-fade-in space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};
