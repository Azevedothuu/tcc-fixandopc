import {} from 'react'
import BaseLayout from '../ui/BaseLayout'
import Typography from '../ui/Typography'



function Learn() {

    return (
        <BaseLayout>
        <div className='flex justify-center'>
            <div className='flex justify-center items-center  bg-bg  w-[600px] h-[100px] rounded-lg'>
            <Typography as="h1" variant="display" size="5xl" >
                Aprenda IMC
            </Typography>                      
            </div>                  

        </div>
        </BaseLayout>
    )
}

export default Learn
