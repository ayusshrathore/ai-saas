import Image from "next/image";

export const Loader = () => {
	return (
		<div className="h-full flex flex-col gap-y-4 items-center justify-center">
			<div className="w-10 h-10 relative animate-spin">
				<Image alt="Logo" src="/logo.png" fill />
			</div>
			<p className="text-muted-foreground text-sm">Prometheus is thinking...</p>
		</div>
	);
};
