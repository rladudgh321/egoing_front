import { DefaultValue, RecoilState, atom, selector } from 'recoil';

interface Post {
    id: string;
    title: string;
    desc: string;
}

export const postAtom: RecoilState<Post[]> = atom({
    key: 'post',
    default: [{
        id:'first', title: 'html', desc: 'html is ...'
    }, {
        id:'second', title: 'css', desc :'css is ...'
    }, {
        id:'third', title: 'js', desc: 'js is...'
    }],
  });
 

  export const addPost = selector({
    key: 'addPost',
    get: ({get}) => get(postAtom),
    set: ({get, set}, post) => { 
        const ex = get(postAtom);
        const newValue = [...ex, post];
        set(postAtom as RecoilState<(Post | Post[] | DefaultValue)[]>, newValue);
    }
});