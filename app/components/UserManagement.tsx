'use client'

import { useState, useEffect } from 'react'
import { getUsers } from '@/lib/getUsers'
import { addUser } from '@/lib/addUser'
import { deleteUser } from '@/lib/deleteUser'

interface User {
   user_id: number
   user_name: string
   email: string
}

export default function UserManagement() {
   const [users, setUsers] = useState<User[]>([])
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)
   const [success, setSuccess] = useState<string | null>(null)

   // Fetch users from the database
   const fetchUsers = async () => {
      try {
         setLoading(true)
         setError(null)
         const data = await getUsers()
         setUsers(data.users || [])
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Failed to fetch users')
      } finally {
         setLoading(false)
      }
   }

   const handleAddUser = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
         setLoading(true)
         await addUser(name, email)
         setSuccess('User added successfully!')
         setName('')
         setEmail('')
         await fetchUsers()
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Failed to add user')
      } finally {
         setLoading(false)
      }
   }

   // Delete a user from the database
   const handleDeleteUser = async (userId: string) => {
      try {
         setLoading(true)
         setError(null)
         setSuccess(null)

         await deleteUser(userId)

         setSuccess('User deleted successfully!')
         await fetchUsers()
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Failed to delete user')
         console.error('Error deleting user:', err)
      } finally {
         setLoading(false)
      }
   }

   // Load users on component mount
   useEffect(() => {
      fetchUsers()
   }, [])

   return (
      <div className="w-full max-w-2xl mx-auto p-6">
         <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            User Management
         </h2>

         {/* Add User Form */}
         <form onSubmit={handleAddUser} className="mb-8 space-y-4 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
               Add New User
            </h3>

            <div>
               <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
               </label>
               <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  disabled={loading}
               />
            </div>

            <div>
               <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
               </label>
               <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  disabled={loading}
               />
            </div>

            <button
               type="submit"
               disabled={loading}
               className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
               {loading ? 'Adding...' : 'Add User'}
            </button>

            {error && (
               <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
                  {error}
               </div>
            )}

            {success && (
               <div className="p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
                  {success}
               </div>
            )}
         </form>

         {/* Users List */}
         <div>
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Users List
               </h3>
               <button
                  onClick={fetchUsers}
                  disabled={loading}
                  className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
               >
                  Refresh
               </button>
            </div>

            {loading && users.length === 0 ? (
               <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Loading users...
               </div>
            ) : users.length === 0 ? (
               <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No users found. Add your first user above!
               </div>
            ) : (
               <div className="space-y-3">
                  {users.map((user) => (
                     <div
                        key={user.user_id}
                        className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
                     >
                        <div className="flex justify-between items-start">
                           <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                 {user.user_name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                 {user.email}
                              </p>
                           </div>

                           <button
                              onClick={() => handleDeleteUser(user.user_id.toString())}
                              disabled={loading}
                              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                           >
                              Delete
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   )
}
