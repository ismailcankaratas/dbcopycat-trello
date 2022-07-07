import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { BsThreeDots } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteList } from '../../utils/features/listSlice';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ListDropdawn({ listId }) {
    const dispatch = useDispatch();

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="text-sm p-2 hover:text-gray-500 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <BsThreeDots />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm cursor-pointer'
                                    )}
                                    onClick={() => dispatch(deleteList(listId))}
                                >
                                    Listeyi sil
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
