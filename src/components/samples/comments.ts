const sampleComments: CommentType[] = [
    {
      id: 1,
      body: "This is a great post!",
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-01T00:00:00Z'),
      userId: 1,
      postId: 1,
      user: {
        id: 1,
        clerkUserId: "user_1",
        email: "user1@example.com",
        name: "User One"
      },
      post: {
        id: 1,
        title: "Sample Post Title",
        body: "This is the body of the sample post.",
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-01T00:00:00Z')
      }
    },
    {
      id: 2,
      body: "I found this post very informative.",
      createdAt: new Date('2023-01-02T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
      userId: 2,
      postId: 1,
      user: {
        id: 2,
        clerkUserId: "user_2",
        email: "user2@example.com",
        name: "User Two"
      },
      post: {
        id: 1,
        title: "Sample Post Title",
        body: "This is the body of the sample post.",
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-01T00:00:00Z')
      }
    },
    {
      id: 3,
      body: "Thank you for sharing this post.",
      createdAt: new Date('2023-01-03T00:00:00Z'),
      updatedAt: new Date('2023-01-03T00:00:00Z'),
      userId: 3,
      postId: 1,
      user: {
        id: 3,
        clerkUserId: "user_3",
        email: "user3@example.com",
        name: "User Three"
      },
      post: {
        id: 1,
        title: "Sample Post Title",
        body: "This is the body of the sample post.",
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-01-01T00:00:00Z')
      }
    }
  ];