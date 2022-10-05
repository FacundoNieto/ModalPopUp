import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Trophy from '../public/trophy.png';
import Gift from '../public/gift.png';
import { AiFillFire } from 'react-icons/ai'

let useClickOutside = (handleCloseModal, showModal) => {
  let domNodeRef = useRef(); // defino un objeto que en su atributo "current" no almacenará nada pero sirve para usarlo de referencia
  // console.log("domNodeRef.current (en useClickOutside): ", domNodeRef.current);
  // console.log("domNodeRef FUERA DEL useEffect", domNodeRef);

  useEffect(() => {
    // console.log("domNodeRef dentro del useEffect", domNodeRef);
    // console.log("domNodeRef.current: DENTRO DEL useEffect", domNodeRef.current);

    if (domNodeRef.current) {
      let handler = (event) => { //event es el objeto que se crea cuando se ejecuta el evento 'mousedown', dado por el método "addEventListener". Este objeto tiene un atributo llamado "target", que contiene la información del nodo del dom (etiqueta html..) sobre la cual se realizó el evento (básicamente sobre cuál etiqueta hiciste click...)
        // console.log("domNodeRef.current.contains(event.target) = ", domNodeRef.current.contains(event.target))
        // console.log("showModal pero en el hook useClikOutside: ", showModal);

        //si el modal se está mostrando Y si clickeo fuera del div del modal Y si donde clickeo NO ES el botón que abre el modal, se ejecuta handleCloseModal (son los sets de los useState)
        if (( showModal && !domNodeRef.current.contains(event.target)) && event.target.id != "buttonOpenModal") { //  "domNodeRef.current" es la etiqueta del modal. "event.target" es el elemento del dom (etiqueta html) sobre la que hiciste click. "contains()" devuelve true si la etiqueta sobre la que hiciste click es la misma etiqueta del modal o alguna etiqueta descendiente, si no lo es entonces devuelve false.
          // console.log("entraste al if que cierra el modal... por qué?")
          // console.log("event.target: ", event.target);
          handleCloseModal(false); //cambio el estado de los modals
        }

      }

      document.addEventListener('click', handler);
      return () => {
        document.removeEventListener('click', handler);
      };
    }

  });

  return domNodeRef;
}
const TestModals = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  // console.log("showModal", showModal);
  // console.log("showSecondModal: ", showSecondModal);

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // }
  // const handleCloseSecondModal = () => {
  //   setShowSecondModal(false);
  // }

  // let FirstModalRef = useClickOutside(handleCloseModal, showModal);
  // let SecondModalRef = useClickOutside(handleCloseSecondModal, showSecondModal);

  let FirstModalRef = useClickOutside(setShowModal, showModal);
  let SecondModalRef = useClickOutside(setShowSecondModal, showSecondModal);

  return (
    <div className="flex md:flex-col justify-center items-center mt-40">
      <div className='flex gap-5'>
        <button
          type='button'
          id='buttonOpenModal'
          className="bg-blue-600 text-white active:bg-black hover:bg-black flex justify-center items-center gap-2 font-bold px-6 h-12 rounded-md shadow hover:shadow-lg outline-none focus:outline-none"
          // onClick={handleOpenShowModal}
          onClick={() => setShowModal(true)}
        >
          Open First Modal <AiFillFire className="text-xl" />
        </button>

        <button
          type='button'
          id='buttonOpenModal'
          className="border border-blue-100 text-gray-800 hover:text-white active:bg-black hover:bg-black flex justify-center items-center gap-2 font-bold px-6 h-12 rounded-md hover:shadow-lg outline-none focus:outline-none"
          // onClick={handleOpenShowSecondModal}
          onClick={() => setShowSecondModal(true)}
        >
          Open Second Modal <AiFillFire className="text-xl" />
        </button>
      </div>

      {/*First Modal UI start*/}
      {
        showModal ? (
          <div
            className="mt-10 flex justify-center items-center flex-col w-72 rounded-lg shadow-xl h-auto p-2"
            ref={FirstModalRef}
          >
            <Image src={Trophy} width={100} height={100} objectFit="contain" />
            <h2 className='text-base mt-2 mx-4 text-gray-400 font-semibold text-center'>
              May your life be filled with success and achivements. Congratulations!
            </h2>
            <button
              className='my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold'
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        )
          : null
      }

      {/*Second Modal UI start*/}
      {
        showSecondModal ? (
          <div
            className='mt-10 flex justify-center items-center flex-col w-1/2 rounded-lg shadow-xl h-auto p-2'
            ref={SecondModalRef}
          >
            <Image src={Gift} width={100} height={100} objectFit="contain" />
            <h2 className='text-base mt-2 text-gray-400 font-semibold text-center mx-4'>
              Hurry! Your USD 50,000 Gift Voucher is about to expire! Shop now the latest Summer Trends.
            </h2>
            <div className='flex gap-5'>
              <button
                className='my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold'
                onClick={() => setShowSecondModal(false)}
              >
                Claim Now
              </button>

              <button
                className='w-auto px-12 my-5 border border-red-100 h-10 hover:bg-red-700 hover:text-white rounded-md text-red-600 hover:shadow-lg font-semibold'
                onClick={() => setShowSecondModal(false)}
              >
                Claim Now
              </button>
            </div>
          </div>
        )
          : null
      }



    </div>
  );
}

export default TestModals;