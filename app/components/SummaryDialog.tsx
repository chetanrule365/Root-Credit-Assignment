interface SummaryDialogProps {
  accountType: string;
  fullName: string;
  phoneNumber: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function SummaryDialog({
  accountType,
  fullName,
  phoneNumber,
  onClose,
  onConfirm,
}: SummaryDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-8">
      <div className="w-full max-w-md rounded-4xl bg-white p-6 shadow-2xl">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full">
            <svg
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1133 29.8281C20.5742 30.3672 19.5859 30.3672 19.0469 29.8281L13.2969 24.0781C12.7578 23.5391 12.7578 22.5508 13.2969 22.0117C13.8359 21.4727 14.8242 21.4727 15.3633 22.0117L20.125 26.7734L30.5469 16.2617C31.0859 15.7227 32.0742 15.7227 32.6133 16.2617C33.1523 16.8008 33.1523 17.7891 32.6133 18.3281L21.1133 29.8281ZM46 23C46 35.7578 35.668 46 23 46C10.2422 46 0 35.7578 0 23C0 10.332 10.2422 0 23 0C35.668 0 46 10.332 46 23ZM23 2.875C11.8594 2.875 2.875 11.9492 2.875 23C2.875 34.1406 11.8594 43.125 23 43.125C34.0508 43.125 43.125 34.1406 43.125 23C43.125 11.9492 34.0508 2.875 23 2.875Z"
                fill="#4B59D5"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-950">
            You&apos;re all set!
          </h3>
          <p className="max-w-xs text-sm leading-6 text-slate-500">
            Here&apos;s a quick summary of your account details.
          </p>
        </div>

        <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Account Type</span>
              <span className="font-semibold text-slate-950 capitalize">
                {accountType}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Name</span>
              <span className="font-semibold text-slate-950">{fullName}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Mobile Number</span>
              <span className="font-semibold text-slate-950">
                {phoneNumber}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-2 flex items-center justify-center gap-2 text-sm leading-6 text-slate-500 mb-8">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3047 2.26953C12.7969 2.48828 13.125 2.95312 13.125 3.47266C13.125 10.582 7.90234 13.9727 6.53516 13.9727C5.16797 13.9727 0 10.5273 0 3.47266C0 2.95312 0.300781 2.48828 0.792969 2.26953L6.04297 0.0820312C6.20703 0.0273438 6.37109 0 6.5625 0C6.72656 0 6.89062 0.0273438 7.05469 0.0820312L12.3047 2.26953ZM6.5625 12.6602C9.10547 11.5938 11.8125 8.23047 11.8125 3.47266L6.5625 1.28516L1.3125 3.47266C1.3125 8.12109 3.88281 11.5664 6.5625 12.6602ZM5.03125 6.72656L5.85156 7.54688L8.01172 5.00391C8.14844 4.83984 8.33984 4.78516 8.53125 4.78516C9.02344 4.78516 9.1875 5.22266 9.1875 5.44141C9.1875 5.57812 9.13281 5.74219 9.02344 5.85156L6.39844 8.91406C6.20703 9.13281 5.96094 9.16016 5.90625 9.16016C5.71484 9.16016 5.55078 9.10547 5.44141 8.96875L4.12891 7.65625C3.99219 7.54688 3.9375 7.38281 3.9375 7.19141C3.9375 6.83594 4.21094 6.53516 4.59375 6.53516C4.75781 6.53516 4.92188 6.61719 5.03125 6.72656Z"
              fill="#047647"
            />
          </svg>
          Your account is secured with bank-grade security
        </p>

        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition duration-200 hover:bg-blue-500"
          onClick={onConfirm}
        >
          Go To Dashboard
        </button>
      </div>
    </div>
  );
}
