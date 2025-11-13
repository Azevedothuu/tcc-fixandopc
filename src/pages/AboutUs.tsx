import {} from 'react'
import BaseLayout from '../ui/BaseLayout'
import Typography from '../ui/Typography'
import Team from '../ui/Team'



function AboutUs() {

    return (
        <BaseLayout>
        <div className='flex justify-center'>
            <div className='flex justify-center items-center mb-12  bg-bg  w-[600px] h-[100px] rounded-lg'>
            <Typography as="h1" variant="display" size="5xl" >
                Sobre Nós
            </Typography>                      
            </div>
        
            
        

        </div>
            <Team />
        </BaseLayout>
    )
}

export default AboutUs
