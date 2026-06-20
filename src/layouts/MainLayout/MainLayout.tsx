import { Container } from "react-bootstrap"
import Header from "../../components/shared/Header/Header"
import styles from './styles.module.css'
import Footer from "../../components/shared/Footer/Footer"
import { Outlet } from "react-router-dom"

const {container } = styles

const MainLayout = ()=>{
   return (
    <Container className={container}>

        <Header/>
           <Outlet/>
        <Footer/>


   </Container>
   )
}

export default MainLayout
