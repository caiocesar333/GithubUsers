import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000';  // Ensure the API server is running and accessible from this URL

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