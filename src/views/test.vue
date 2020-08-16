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
        location: 'London - Great Britain',
        tags: [
          {
            name: 'Nature',
            color: '#4099ff',
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
        location: 'London - Great Britain',
        tags: [
          {
            name: 'Nature',
            color: '#4099ff',
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
        location: 'London - Great Britain',
        tags: [
          {
            name: 'Nature',
            color: '#4099ff',
            pk: 1,
          },
          {
            name: 'Testable',
            color: '#8f9aa5',
            pk: 2,
          },
          {
            name: 'Leute',
            color: '#ff0000',
            pk: 3,
          },
          {
            name: 'die',
            color: '#cc00ff',
            pk: 4,
          },
          {
            name: ' \'die',
            color: '#9e3f00',
            pk: 5,
          },
          {
            name: ' Nutella\'',
            color: '#9e3f00',
            pk: 7,
          },
          {
            name: 'sagen',
            color: '#beff0a',
            pk: 6,
          },
          {
            name: 'sind',
            color: '#2dc906',
            pk: 9,
          },
          {
            name: ' psychopathen',
            color: '#4099ff',
            pk: 10,
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
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 36,
          },
          {
            url: `https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80`,
            pk: 7,
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
