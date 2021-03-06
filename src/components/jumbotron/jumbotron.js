import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import Img from "gatsby-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { richTextOptions } from "../../utility/richtext"
import * as ActionTypes from "../../store/actions"
import CloseIcon from "../../images/close_overlay.svg"
import { size } from "../../index.styles"
const JumbotronWrapper = styled.section`
  /* padding: 1rem; */
  height: 70vh;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  @media (max-width: ${size.tablet}) {
    justify-content: center;
  }
  z-index: 500;

`

const JumbotronModal = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* background: yellow; */
  padding: 1rem;
  @media (max-width: ${size.mobileL}) {
    padding: 0;
  }
  display: ${props => (props.show ? "" : "none")};
`

const ModalHeader = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  @media (max-width: ${size.mobileL}) {
    padding: 0 1rem;
  }
`

const ModalBody = styled.div`
  overflow-y: scroll;
  height: inherit;
  scrollbar-width: none;
`
const JumbotronUnderlay = styled.div`
  display: ${props => (props.show ? "" : "none")};
  width: auto;
  max-height: 100%;
  padding-bottom: 1rem;
`

const ImageTitle = styled.p`
  display: none;
  font-style: italic;
  @media (max-width: ${size.tablet}) {
    display: inherit;
  }
`

const ImageContiner = styled.div`
  width: 100%;
  @media (min-width: ${size.desktop}) {
    width: 90%;
  }
`

const CloseImageContainer = styled.div`
  width: 3%;
  z-index: 500;

  :hover {
    cursor: pointer;
  }
  @media (max-width: ${size.tablet}) {
    width: 5%;
  }

  @media (max-width: ${size.mobileL}) {
    width: 12%;
  }
`

const Jumbotron = props => {
  let content = props.jumbotronContent
  let image = content.find(im => {
    return im.type === "Image"
  })

  let project = content.find(pr => {
    return pr.type === "Project"
  })

  let displayedContent = content.find(co => {
    return co.id === props.jumbotron_modal_content
  })

  return (
    <JumbotronWrapper>
      <JumbotronModal show={props.show_jumbotron_modal}>
        <ModalHeader>
          <CloseImageContainer>
            <img src={CloseIcon} onClick={() => props.hideJumbotronModal()} />
          </CloseImageContainer>
        </ModalHeader>

        <ModalBody>
          {displayedContent
            ? documentToReactComponents(
                displayedContent.text.json,
                richTextOptions
              )
            : null}
        </ModalBody>
      </JumbotronModal>
      <JumbotronUnderlay onClick={() => props.showJumbotronModal(project.id)} show={!props.show_jumbotron_modal}>
        <ImageTitle> {image.title} </ImageTitle>
        <ImageContiner>
          {image ? <Img fluid={image.image.fluid} /> : null}
        </ImageContiner>
      </JumbotronUnderlay>
    </JumbotronWrapper>
  )
}

const mapStateToProps = state => {
  return {
    isLoaded: state.isLoaded,
    jumbotronContent: state.jumbotron_content,
    show_jumbotron_modal: state.show_jumbotron_modal,
    jumbotron_modal_content: state.jumbotron_modal_content,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideJumbotronModal: () =>
      dispatch({
        type: ActionTypes.HIDE_JUMBOTRON_MODAL,
      }),
    showJumbotronModal: jumbotron_id =>
      dispatch({
        type: ActionTypes.SHOW_JUMBOTRON_MODAL,
        jumbotron_modal_content: jumbotron_id,
      }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Jumbotron)
