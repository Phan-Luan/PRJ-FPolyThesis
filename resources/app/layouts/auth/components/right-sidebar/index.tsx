import { FriendService } from '@/apis/services/friend.service';
import { pathName } from '@/routes/path-name';
import { useQuery } from '@tanstack/react-query';
import { Card, Image } from 'react-bootstrap';

export const RightSidebar = () => {
  const minirightsidebar = () => {
    (document.getElementById('rightSidebar') as HTMLElement).classList.toggle('right-sidebar');
    document.body.classList.toggle('right-sidebar-close');
  };

  const fetchAllFriendMyUser = async () => {
    // const {user} = TokenService.getUser()
    const { data } = await FriendService.showAllFriendMyUser();
    return data;
  };

  const FriendsMyUserQueryKey = ['friendmyuser'];
  const { data: friendsMyUser, isLoading } = useQuery(FriendsMyUserQueryKey, { queryFn: fetchAllFriendMyUser });

  return (
    <>
      <div className="right-sidebar-mini" id="rightSidebar">
        <div className="right-sidebar-panel p-0">
          <Card className="shadow-none">
            <Card.Body className="p-0">
              <div className="media-height p-3" data-scrollbar="init">
                {isLoading ? (
                  <>
                    <div>...Loading</div>
                  </>
                ) : (
                  <>
                    {friendsMyUser && friendsMyUser.length > 0 ? (
                      <>
                        {friendsMyUser.map((itemfriend: any) => (
                          <a
                            key={itemfriend?.friend?.id}
                            href={`${pathName.CHAT}/${itemfriend?.friend?.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="d-flex align-items-center mb-4">
                              <div className="iq-profile-avatar status-online">
                                <Image
                                  className="rounded-circle avatar-50"
                                  src={itemfriend?.friend?.avatar}
                                  alt=""
                                  loading="lazy"
                                />
                              </div>
                              <div className="ms-3">
                                <h6 className="mb-0">{itemfriend?.friend?.username}</h6>
                                <p className="mb-0">Just Now</p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </>
                    ) : (
                      <div>Chưa có bạn bè</div>
                    )}
                  </>
                )}
              </div>
              <div className="right-sidebar-toggle bg-primary text-white mt-3 d-flex" onClick={minirightsidebar}>
                <span className="material-symbols-outlined">chat</span>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
