export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="tr">
            <body>{children}</body>
        </html>
    )
}
