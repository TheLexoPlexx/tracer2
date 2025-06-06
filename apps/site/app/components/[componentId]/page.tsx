import { ComponentEditorPage } from "@/components/componentEditor/[componentId]/page"

export default async function Page(props: {
  params: Promise<{ componentId: string }>
}) {
  const { componentId } = await props.params;

  return (
    <ComponentEditorPage componentId={componentId} />
  )
}