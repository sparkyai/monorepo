export default function VideoPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#6F5AFF] via-[#C135FF] to-[#FF3797] text-gray-50">
      <svg fill="currentColor" height="89" viewBox="0 0 109 89" width="109">
        <path d="M46.8919 28.1688C46.4573 27.8594 45.946 27.6755 45.4139 27.6374C44.8818 27.5993 44.3495 27.7084 43.8752 27.9527C43.401 28.197 43.0032 28.5672 42.7253 29.0225C42.4475 29.4779 42.3003 30.001 42.3 30.5345V59.597C42.3003 60.1304 42.4475 60.6535 42.7253 61.1089C43.0032 61.5643 43.401 61.9344 43.8752 62.1787C44.3495 62.423 44.8818 62.5321 45.4139 62.494C45.946 62.4559 46.4573 62.2721 46.8919 61.9627L67.2356 47.4314C67.6124 47.1626 67.9194 46.8076 68.1313 46.3962C68.3432 45.9847 68.4537 45.5285 68.4537 45.0657C68.4537 44.6029 68.3432 44.1468 68.1313 43.7353C67.9194 43.3238 67.6124 42.9689 67.2356 42.7L46.8919 28.1688Z" />
        <path d="M11.7049 13.0349C9.52478 15.215 8.3 18.1719 8.3 21.255V67.755C8.3 70.8381 9.52478 73.795 11.7049 75.9751C13.885 78.1552 16.8419 79.38 19.925 79.38H43.6926L49.5051 73.5675H19.925C18.3834 73.5675 16.905 72.9551 15.8149 71.8651C14.7249 70.775 14.1125 69.2966 14.1125 67.755V21.255C14.1125 19.7134 14.7249 18.235 15.8149 17.1449C16.905 16.0549 18.3834 15.4425 19.925 15.4425H89.675C91.2166 15.4425 92.695 16.0549 93.7851 17.1449C94.8751 18.235 95.4875 19.7134 95.4875 21.255V27.5851L101.3 21.7726V21.255C101.3 18.1719 100.075 15.215 97.8951 13.0349C95.715 10.8548 92.7581 9.63 89.675 9.63H19.925C16.8419 9.63 13.885 10.8548 11.7049 13.0349Z" />
        <path d="M101.3 26.0152L95.4875 31.8277V67.755C95.4875 69.2966 94.8751 70.775 93.7851 71.8651C92.695 72.9551 91.2166 73.5675 89.675 73.5675H53.7477L47.9352 79.38H89.675C92.7581 79.38 95.715 78.1552 97.8951 75.9751C100.075 73.795 101.3 70.8381 101.3 67.755V26.0152Z" />
        <path d="M106.415 20.658C107.001 20.0722 107.951 20.0722 108.536 20.658C109.122 21.2437 109.122 22.1935 108.536 22.7793L43.3685 87.9473C42.7827 88.533 41.8329 88.533 41.2471 87.9473C40.6613 87.3615 40.6613 86.4117 41.2471 85.8259L106.415 20.658Z" />
      </svg>
      <div className="mt-2 flex flex-col text-center uppercase">
        <p className="flex justify-between text-center text-2xl font-bold">
          <span className="block">v</span>
          <span className="block">i</span>
          <span className="block">d</span>
          <span className="block">e</span>
          <span className="block">o</span>
        </p>
        <p className="border-t border-gray-50">coming soon</p>
      </div>
    </div>
  );
}
