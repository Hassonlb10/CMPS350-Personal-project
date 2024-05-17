import { getAllUsers, createUser, updateUser, deleteUser, updateUserPurchasedItems } from '../../repo/users';

export async function GET(request) {
    try {
        const users = await getAllUsers();
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error fetching users" }), { status: 500 });
    }
}

export async function POST(request, { params }) {
    try {
        const userData = await request.json();
        // If 'past_purchases' are present in userData, it indicates an update to past purchases
        if (userData.past_purchases) {
            const updatedUser = await updateUserProducts(userData.id, userData);
            console.log("in API", updatedUser);
            return new Response(JSON.stringify(updatedUser), { status: 200 });
        } else {
            const user = await createUser(userData);
            return new Response(JSON.stringify(user), { status: 201 });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error creating or updating user" }), { status: 400 });
    }
}

export async function PUT(request, { params }) {
    try {
        const userData = await request.json();
        console.log("userData1", userData);
        const updatedUser = await updateUser(userData.id, userData);
        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: error.toString() }), { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await deleteUser(params.id);
        return new Response(JSON.stringify({ message: "User deleted" }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Error deleting user" }), { status: 500 });
    }
}

// export async function POST(request) {
//     try {
//         const userData = await request.json();
//         const user = await updateUserProducts(userData.id, userData);
//         return new Response(JSON.stringify(user), { status: 201 });
//     } catch (error) {
//         console.error(error);
//         return new Response(JSON.stringify({ message: "Error creating user" }), { status: 400 });
//     }
// }