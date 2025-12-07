"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { ExtendedAccount } from "../../organizations/lib";
import {
  AccountsPaginationDataType,
  AccountsType,
  getAccounts,
  useDebounce,
} from "../lib";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { queryStringBuilder } from "@/lib/generic-string-builder";
import Image from "next/image";
import noImage from "@public/placeholder/no-image.webp";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { LabelFieldBlock, FieldBlock } from "@/components/feature/common";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  currentMembers: any[];
  members: string[];
  setMembers: Dispatch<SetStateAction<string[]>>;
}

const Spinner = () => {
  return (
    <div className="bg-gray-100 py-1">
      <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
    </div>
  );
};

export const UsersListSelection = ({
  currentMembers,
  members,
  setMembers,
}: Props) => {
  const [users, setUsers] = useState<ExtendedAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFromSearch, setFromSearch] = useState(false);
  const { data: currentUser, status } = useSession();
  const currentUserId = currentUser?.user?.id;
  const [pagination, setPagination] = useState<AccountsPaginationDataType>(
    {} as AccountsPaginationDataType,
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const transformUsers = useCallback(
    (users: AccountsType[]) => {
      const orgUserIds = new Set(currentMembers);

      return users.map((user) => ({
        ...user,
        isMember: orgUserIds.has(user.id),
      }));
    },
    [currentMembers],
  );

  const fetchUsersData = useCallback(
    async (searchKeyword?: string, page?: string) => {
      if (!currentUserId) {
        return;
      }
      if (isFromSearch && !searchKeyword) {
        setFromSearch(false);
        setUsers([]);
        return;
      }
      try {
        const usersResponse = await getAccounts(searchKeyword, page, members);
        const { data: usersData } = usersResponse;
        const { data: usersList, ...paginationData } = usersData;
        const newAccounts: ExtendedAccount[] = transformUsers(usersList);
        const filteredAccounts: ExtendedAccount[] = newAccounts.filter(
          (account) => account.id.toString() !== currentUserId.toString(),
        );

        setPagination((prev) => ({
          ...paginationData,
          next_page_url:
            usersList.length === 0 ? null : paginationData.next_page_url,
        }));
        if (searchKeyword) {
          setFromSearch(true);
          setUsers(filteredAccounts);
        } else {
          if (!isFromSearch) {
            setUsers((prevUsers) => {
              const existingIds = new Set(prevUsers.map((user) => user.id));
              const newUniqueUsers = filteredAccounts.filter(
                (user) => !existingIds.has(user.id),
              );

              return [...prevUsers, ...newUniqueUsers];
            });
          } else {
            setUsers(filteredAccounts);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    //  "members" not added on the dependency intentionally [currentUserId, isFromSearch, transformUsers, members],
    // @ts-ignore - Added ignore because members to dependency array will cause bugs
    [currentUserId, isFromSearch, transformUsers],
  );

  useEffect(() => {
    if (status === "authenticated" || debouncedSearchTerm) {
      fetchUsersData(debouncedSearchTerm || "");
    }
  }, [status, debouncedSearchTerm, fetchUsersData]);

  const loadMoreItems = (url: string | null) => {
    if (!url || !pagination.next_page_url) return;
    const pageNumberMatch = url.match(/[?&]page=(\d+)/);
    const pageNumber = pageNumberMatch ? pageNumberMatch[1] : null;

    if (pageNumber) {
      const builtQueryString = queryStringBuilder({
        queryString: searchTerm,
        targetKey: "page",
        targetValue: pageNumber,
      });

      fetchUsersData(searchTerm, builtQueryString);
    }
  };

  const handleUsersCheckboxChange = (id: string, checked: boolean) => {
    setMembers((prevMembers) =>
      checked
        ? [...prevMembers, id].filter(
            (memberId, index, self) => self.indexOf(memberId) === index,
          ) // Ensure no duplicates
        : prevMembers.filter((memberId) => memberId !== id),
    );

    setUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === id ? { ...user, isMember: !user.isMember } : user,
      );
    });
  };

  return (
    <div className="mb-5 border-[.125rem] border-shade-400 pt-[.625rem]">
      <LabelFieldBlock className="p-5 lg:p-0">
        <FieldBlock>
          <FormField
            name="member_list"
            render={({ field: formField }) => {
              return (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Input
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        formField.onChange(e.target.value);
                      }}
                      placeholder="ユーザー絞り込み"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </FieldBlock>
      </LabelFieldBlock>
      {users.length !== 0 && (
        <div className="p-5 pb-4 pt-0 md:pb-16">
          <InfiniteScroll
            className="h-[60vw] md:h-[26.25rem]"
            dataLength={users.length}
            next={() => loadMoreItems(pagination.next_page_url)}
            hasMore={
              Boolean(pagination.next_page_url) &&
              users.length < pagination.total
            }
            height={window.innerWidth > 768 ? 200 : 300}
            loader={<Spinner />}
            scrollThreshold={0.9}
            endMessage={
              <p className="text-center text-xs text-gray-400 lg:text-base">
                表示するユーザーはもういません
              </p>
            }
          >
            {users.map((user, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-wrap items-center gap-[.625rem] pb-[.625rem]"
                >
                  <Checkbox
                    key={index}
                    id={user.id}
                    checked={members.includes(user.id)}
                    onCheckedChange={(checked) =>
                      handleUsersCheckboxChange(user.id, checked as boolean)
                    }
                  />
                  <label htmlFor={user.id} className="cursor-pointer">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        className="object-cover"
                        src={user.avatar || noImage}
                        fill
                        sizes="100%"
                        alt={`image`}
                      />
                    </div>
                  </label>
                  <p className="text-[.75rem] md:text-xs">
                    <label
                      className="cursor-pointer text-sm sm:text-base"
                      htmlFor={user.id}
                    >
                      {`${user.family_name} ${user.given_name}`}
                    </label>
                  </p>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};
