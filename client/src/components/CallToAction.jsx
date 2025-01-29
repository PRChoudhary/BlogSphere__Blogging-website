import { Button } from 'flowbite-react';
export default function CallToAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                    Want to learn more about JavaScript?
                </h2>
                <p className='text-gray-500 my-2'>
                    Checkout these resources with MERN Projects
                </p>
                <Button gradientDuoTone='tealToLime' className='rounded-tl-xl rounded-bl-none'>
                    <a href="https://github.com/vinay-patel22" target='_blank' rel='noopener noreferrer'>
                        MERN Projects
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://cdn.pixabay.com/photo/2019/10/03/12/12/javascript-4523100_1280.jpg" />
            </div>
        </div>
    )
}
