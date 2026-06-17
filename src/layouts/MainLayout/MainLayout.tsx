import { Container } from "react-bootstrap"
import Header from "../../components/shared/Header/Header"
import styles from './styles.module.css'

const {container } = styles

const MainLayout = ()=>{
   return (
    <Container className={container}>

        <Header/>

   </Container>
   )
}

export default MainLayout
