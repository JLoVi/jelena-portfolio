import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { GlobalStyle } from "../../index.styles";
import Header from "../header/header";
import State from "../state/state";

const LayoutWrapper = styled.div`
    padding: 1rem;
    height: 100vh;
    width: 100vw;
`

const MainWrapper = styled.main`
    padding: 0.5rem;
    
`
const Layout = (props) => {
    return (
        <LayoutWrapper> 
            <GlobalStyle />
            <Header />
            <State />
            <MainWrapper>
                {props.children}
            </MainWrapper>
        </LayoutWrapper>


    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    colour: PropTypes.string
  }


export default Layout;