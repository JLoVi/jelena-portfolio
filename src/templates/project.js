import React from "react"
import Layout from "../components/layout/layout"
import { Convert } from "../utility/convert"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextOptions } from "../utility/richtext"
import ImageCarousel from "../components/image-carousel/image-carousel"
import { PageWrapper } from "./page";

const Project = props => {
  let item = Convert.toProjectModel(props.pageContext)
  return (
    <Layout>
      <PageWrapper>
        {/* DESCRIPTION */}
        {item.display_description ? documentToReactComponents(
          item.description.json,
          richTextOptions
        ) : null}
        {/* IMAGES */}
        {item.display_images ? <ImageCarousel images={item.images} />: null}

        {/* VIDEO */}
        {item.display_video ? <p>videos</p>: null}

      </PageWrapper>
    </Layout>
  )
}

export default Project
