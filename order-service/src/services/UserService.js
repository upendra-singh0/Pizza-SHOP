import ServiceError from '../util/ServiceError';

const userDetail = [
  { name: 'Amazon', id: 1, rule: [1, 2] },
  { name: 'Infosys', id: 2, rule: [1, 2] },
  { name: 'facebook', id: 3, rule: [1, 2] },
  { name: 'Default', id: 4, rule: null },
  { name: 'Special', id: 5, rule: [1, 2] },
];

const get = async ({ id }) => {
  // write query
  try {
    const user = userDetail.find((u) => u.id === id);
    return user;
  } catch (err) {
    // console.log(err);
    throw new ServiceError({ message: 'Internal Service Error', status: 500 });
  }
};

export { get };
