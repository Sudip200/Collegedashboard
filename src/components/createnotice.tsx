import { useState } from 'react';

const CreateNotification = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event:Event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createnotification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials : 'include',
        body: JSON.stringify({
          title,
          description,
          date
        }),
      });
      const data = await response.text()
      console.log(data)
      if(data==='saved'){
        alert('Saved')
        setTitle('')
        setDate('')
        setDescription('')
      }
      console.log(data);
    } catch (error:any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-lg font-bold mb-4">Create Notification</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Notification
        </button>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </form>
    </div>
  );
};

export default CreateNotification;