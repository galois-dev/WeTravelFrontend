<template>
  <travel_book_list
    :travel_books="[
      {
        title: 'FutureTrip',
        creator: 'Test',
        travellers: [
          {
            profile_image: {
              url:
                'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
              alt: 'user picture',
            },
            pk: 2,
          },
        ],
        location: 'London',
        tags: [
          {
            name: 'Nature',
            color: '#ABAA',
            pk: 1,
          },
        ],
        pk: 3,
        images: [
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 1,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 4,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 5,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 11,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 41,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 51,
          },
        ],
      },
      {
        title: 'FutureTrip',
        creator: 'Test',
        travellers: [
          {
            profile_image: {
              url:
                'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
              alt: 'user picture',
            },
            pk: 2,
          },
        ],
        location: 'London',
        tags: [
          {
            name: 'Nature',
            color: '#ABAA',
            pk: 1,
          },
        ],
        pk: 1,
        images: [
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 1,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 5,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 2,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 3,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 4,
          },
        ],
      },
      {
        title: 'FutureTrip',
        creator: 'Test',
        travellers: [
          {
            profile_image: {
              url:
                'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
              alt: 'user picture',
            },
            pk: 2,
          },
        ],
        location: 'London',
        tags: [
          {
            name: 'Nature',
            color: '#ABAA',
            pk: 1,
          },
          {
            name: 'Testable',
            color: '#ABEAA',
            pk: 2,
          },
        ],
        pk: 2,
        images: [
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 1,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 2,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 3,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 4,
          },
        ],
      },
    ]"
  />
</template>

<script>
import travel_book_list from "../components/travel_book_list";
export default {
  components: {
    travel_book_list,
  },
};
</script>

<style></style>
