import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <div className="pt-16">{props.children}</div>
      <Footer />
    </>
  )
}
