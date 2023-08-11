import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://github-users-test.onrender.com';  // Ensure the API server is running and accessible from this URL

interface User {
    id: number;
    login: string;
    avatar_url: string;
    // Add other fields as necessary
}

const GitHubUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSinces, setPageSinces] = useState<{ [page: number]: number }>({ 1: 0 }); // Starts with page 1 having a since value of 0

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const sinceValue = pageSinces[currentPage];
                const response = await axios.get(`${API_BASE_URL}/api/users`, {
                    params: {
                        since: sinceValue
                    }
                });

                setUsers(response.data.users);

                // update the since value for the next page
                const nextPageUrl = response.data.nextPage;
                if (nextPageUrl) {
                    const nextSince = Number(new URL(nextPageUrl).searchParams.get('since'));
                    setPageSinces(prev => ({ ...prev, [currentPage + 1]: nextSince }));
                }
            } catch (error) {
                console.log(`The App could not load the users, ${error}`)
            }
        };

        fetchUsers();
    }, [currentPage]);

    if (!users) {
        return (
            <div role="status" className='flex mt-96'>
                <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>)
    }

    return (
        <div className="m-1 flex gap-8 flex-col justify-center m-0 items-center">
            <h1 className='text-4xl text-title font-semibold'>GitHub Users</h1>
            <div className='gap-5 grid grid-cols-5'>

                {users.map(user => (
                    <Link to={`/user/${user.login}`} key={user.id}>
                        <div className='p-2 border rounded flex flex-col items-center gap-2 hover:bg-gray-600 hover:cursor-pointer ' key={user.id}>
                            <img src={user.avatar_url} alt={user.login} width="50" />
                            <span>{user.login}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='flex gap-5'>
                {Array.from({ length: 10 }).map((_, index) => (
                    <div className='flex'>
                        <button
                            className={`border font-medium rounded p-2 hover:ease-out ${currentPage === index + 1 ? 'bg-secundary text-black' : 'hover:bg-secundary hover:text-black'
                                }`}
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default GitHubUsers;