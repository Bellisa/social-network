import { http } from "@socialNetwork";
import { ENV } from "../../../../const/const"

class FriendsService {
    getTemplate() {
        return `<div class="media text-muted pt-3">
          <img src="${ENV.API_URL}{{avatar}}" alt="32x32" class="mr-2 rounded" style="width: 64px; height: 64px;">
          <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <div class="d-flex justify-content-between align-items-center w-100">
              <strong class="text-gray-dark">{{firstname}} {{lastname}}</strong>
              {{}}
              <button id="{{idbutton}}" type="button" class="btn btn-outline-{{buttontype}} addEventToButtonClick">{{text}}</button>
            </div>
            <span class="d-block">{{login}}</span>
          </div>
        </div>`;
    }
    renderComponent(userList, user, action) {

        let templ = '';
        userList.forEach(el => {

            let textButt = '';
            let typeButt = '';
            let idbutton = '';
            let added = ''
            switch (action) {
                case 'outgoing':
                    textButt = 'Cancel request';
                    typeButt = 'warning';
                    idbutton = `${el.id}_cancel-request-friend_${user.id}`;
                    added = `<span><i>pending request</i><span>`
                    break;
                case 'friends':
                    textButt = 'Remove friend';
                    typeButt = 'secondary';
                    idbutton = `${el.id}_remove-friend_${user.id}`;
                    added = `<span><i>friends</i><span>`
                    break;
                case 'incoming':
                    textButt = 'Ignore';
                    typeButt = 'danger';
                    idbutton = `${el.id}_ignore-friend_${user.id}`;
                    added = `<spa><i>request </i></span><button id="${el.id}_accept-friend_${user.id}" type="button" class="btn btn-outline-success addEventToButtonClick">Accept</button>`
                    break;

            }

            templ += this.getTemplate()
                .replace('{{avatar}}', el.avatar)
                .replace('{{firstname}}', el.first_name)
                .replace('{{lastname}}', el.last_name)
                .replace('{{login}}', el.login)
                .replace('{{text}}', textButt)
                .replace('{{buttontype}}', typeButt)
                .replace('{{idbutton}}', idbutton)
                .replace('{{}}', added);

        });
        return templ;
    }
    async processButtonClick(friend_id, action, user_id) {
        switch (action) {
            case 'cancel-request-friend':
                return await http.put('api/request/skip', { user_id, friend_id }, true, {});
            case 'remove-friend':
                return await http.delete(`api/friends/${user_id}/${friend_id}`, {}, true, {});
            case 'add-friend':
                return await http.put(`api/request`, { user_id: +user_id, friend_id: +friend_id }, true, {});
            case 'ignore-friend':
                return await http.put(`api/request/skip`, { user_id: friend_id, friend_id: user_id }, true, {});
            case 'accept-friend':
                return await http.put(`api/request/approve`, { user_id: +friend_id, friend_id: user_id, }, true, {})
            default:
                return Promise.reject(error)
        }
    }

}
export const friendsService = new FriendsService();