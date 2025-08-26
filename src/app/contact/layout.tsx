import {Navbar} from "./_components/navbar";

const ContactLayout = ({ children }: { children: React.ReactNode }) => {

    return(
  
        <main>
         <Navbar/>
        {children}
        </main>
    )
}
export default ContactLayout;