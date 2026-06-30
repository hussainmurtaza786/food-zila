
export const GET = async () => {

    return Response.json(
        { user: { name: 'hussain', age: 16, isMarried: false } },
        // { status: 200 }
    )
}