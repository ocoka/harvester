import { Bookmark } from './arch/interfaces';
import { Store } from './arch/abstract-store';
import { serialIterator } from '@/utility/iterator';
import { Subject } from 'rxjs';
export class BookmarkStore extends Store<Bookmark[]> {
    constructor() {
      super(new Subject<Bookmark[]>())
    }
    static getSingleInstance() {
      if (!BookmarkStore.instances.has(BookmarkStore)) {
        BookmarkStore.instances.set(BookmarkStore, new BookmarkStore());
      }
      this.addHolder(BookmarkStore, this.getSingleInstance);
      return BookmarkStore.instances.get(BookmarkStore)!;
    }
    requestBookmarks() {
      chrome.bookmarks.getTree(_ => {
        const flatBookmarks: chrome.bookmarks.BookmarkTreeNode[] = Array.from(serialIterator<chrome.bookmarks.BookmarkTreeNode>(_, ['children']));
        this.setState(flatBookmarks.map(_ => ({
          title: _.title,
          url: _.url
        })));
      })
    }
}
