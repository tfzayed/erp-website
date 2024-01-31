export const userGroups = (users) =>
  users.reduce((acc, curr) => {
    const groupIndex = acc.findIndex((dept) => dept.label === curr.department);
    if (groupIndex !== -1) {
      const newArr = [...acc];
      newArr[groupIndex].options = [
        ...newArr[groupIndex].options,
        { label: curr.name, value: curr.user_id },
      ];
      return newArr;
    }
    return [
      ...acc,
      {
        label: curr.department ? curr.department : "unassigned",
        options: [
          {
            label: curr.name,
            value: curr.user_id,
          },
        ],
      },
    ];
  }, []);
