export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth : body.birth,
      address: body.address || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
};

export const responseFromUser = ({ user, preferences }) => {
    const u = Array.isArray(user) ? user[0] : user;
  
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      gender: u.gender,
      birth: u.birth,
      address: u.address,
      phoneNumber: u.phone_number,
      preferences: preferences.map((pref) => ({
        id: pref.food_category_id,
        name: pref.name,
      })),
    };
  };