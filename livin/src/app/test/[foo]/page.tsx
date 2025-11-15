export default async function Test({ params }: { params: Promise<{ foo: string }> }) {
  const { foo } = await params;
  return <pre>{foo}</pre>;
}
