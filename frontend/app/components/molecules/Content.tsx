

export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background h-full p-4">
            {children}
        </div>
    );
}