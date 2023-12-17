/**
 * 3.关系型数组转换成树形结构对象
var obj = [
    { id:3, parent:2 },
    { id:1, parent:null },
    { id:2, parent:1 }
]
转换成
o = { 
  id: 1, 
  parent: null, 
  children: [{ 
    id: 2, 
    parent: 1, 
    children: [{ 
      id: 3, 
      parent: 2 
    }] 
  }]
};

 */

interface ObjModel {
  id: number;
  parent: number | null;
}

interface ReturnModel extends ObjModel {
  id: number;
  parent: number | null;
  children: ReturnModel[];
}

function convert(obj: ObjModel[]) {
  const map = new Map<number, number[]>();

  obj.forEach((o) => {
    if (o.parent) {
      const res = map.get(o.parent) || [];
      res.push(o.id);
      map.set(o.parent, res);
    } else {
      map.set(o.id, []);
    }
  });
}
