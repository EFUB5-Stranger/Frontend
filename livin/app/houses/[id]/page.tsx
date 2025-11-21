export default async function HouseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <h1>House Detail: {id}</h1>;
}
