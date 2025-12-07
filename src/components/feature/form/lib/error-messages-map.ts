// Note: Object was copied pasted from BE file: jp.json.
// Note: You can copy paste from BE jp.json if needed.
export const JP_ERROR_MESSAGE = {
  "family_name.required": "姓は必須です",
  "given.required": "名は必須です",
  "phonetic_family_name.required.": "姓（かな）は必須です",
  "phonetic_given_name.required": "名（かな）は必須です",
  "date_of_birth.required": "生年月日は必須です",
  "postal_code.required": "郵便番号は必須です",
  "postal_code.max": "郵便番号は7桁で入力してください",
  "provice.required": "都道府県は必須です",
  "address_1.required": "住所1は必須です",
  "address_2.required": "住所2は必須です",
  "address_3.required": "電話番号は必須です",
  "phone_number.max": "携帯電話番号は30桁以下である必要があります",
  "mobile_phone_number.max": "携帯電話番号は30桁以下である必要があります",
  "email.required": "メールアドレスは必須です",
  "email.unique": "すでに登録されているメールアドレスです",
  "login_id.required": "ログインIDは必須です",
  "login_id.max": "ログインIDは100文字以下である必要があります",
  "login_id.unique": "すでに登録されているIDです",
  "password.required": "パスワードは必須です",
  "password.confirmed": "パスワード（確認）は必須です",
  "nickname.max": "ニックネームは :attribute 文字以内でご記入ください",
  "favorite_sport.max": "ニックネームは :attribute 文字以内でご記入ください",
  "favorite_gourmet.max": "ニックネームは :attribute 文字以内でご記入ください",
  "contributor_name.required_if":
    "記事投稿者として申請する場合、記事投稿者名は必須です",
  "advertiser_name.required_if": "Required field.",
  category_not_found: "カテゴリが見つかりません",
  tag_not_found: "タグが見つかりません",

  "article_title.required": "記事タイトルは必須です",
  "article_body.required": "記事本文は必須です",
  "article_body.max": "記事タイトルは200文字以内にしてください",
  "article_organization.requried": "記事対象組織は必須です",
  "article_publication.required": "公開開始日時は必須です",
  "article_end_publication.required": "公開終了日時は必須です",

  "article_category_name.required": "カテゴリ名は必須です",
  "article_category_short_name.max":
    "カテゴリ名（短縮）は100文字以下にしてください",
  "article_category_color.required": "背景色は必須です",
  "article_category_color.regex": "無効なカラーコードです",

  "user_old_password.required": "変更前のパスワードは必須です",
  "user_password.required": "変更したいパスワードは必須です",
  "user_password.confirmed": "変更したいパスワード（再入力）は必須です",
  password_change_success: "パスワードが変更されました。",
  password_mixed:
    "パスワードフィールドには、少なくとも 1 つの大文字と 1 つの小文字が含まれている必要があります。",
  password_numbers:
    "パスワードフィールドには少なくとも 1 つの数字が含まれている必要があります。",
  "top_article_publish_ended_at.after":
    "表示開始日時は表示終了日時よりも前の日時にしてください",

  "admin_article_title.required": "記事タイトルは必須です",
  "admin_article_attachments.required": "画像ファイルを指定してください",
  "admin_article_body.required": "記事本文は必須です",
  "admin_article_organization.requried": "記事対象組織は必須です",
  "admin_article_categories.required": "１つ以上のカテゴリを指定してください",
  "admin_article_publication.required": "公開開始日時は必須です",
  "admin_article_end_publication.required": "公開終了日時は必須です",
  "admin_article_alignment_medias.required": "1つ以上のカテゴリを指定",
  "admin_article_publication_article_flag.accepted": "掲載をお受け取りください",
  "admin_pr_flag_article.invalid":
    "pr フラグ フィールドは true または false である必要があります。",

  "admin_article_list.dates_required":
    "日付」フィールドには、正確に 2 つの日付を含める必要があります",
  "admin_article_list.dates.greater":
    "「published_at」日付を「publish_end_at」日付より大きくすることはできません。",
  "admin_article_list.dates_string":
    "「日付」フィールドはカンマ区切りの文字列である必要があります。",
  "admin_article_list.perPage.integer":
    "perPage フィールドは正の整数である必要があります。",

  "admin_article_tag.required": "名前フィールドは必須です。",
  problem_occured: "問題が発生しました。もう一度試してください。",
  success_reset_password: "パスワードがリセットされました。",
  send_reset_link_to_email:
    "登録したメールアドレスにパスワードリセットリンクが送信されました。",
  "token.required": "トークンアドレスは必須です",

  not_found_common: "見つかりません。",
  post_limit_exceed: "今日のデフォルトの投稿数を超えました",

  "user_contributor_name.required": "記事投稿者名は必須です",
  "user_contributor_name.max":
    "記事の著者名は 100 文字以内にする必要がありま。",
  "user_rakuten_id.required": "楽天IDは必須です",
  user_contributor_updated_success:
    "ユーザー投稿者名とrakutinが正常に更新されました",

  unauthenticated_user: "unauthenticated_user",
  contributor_update_failed: "共同作成者の更新に失敗しました",
  contributor_status_update_failed: "共同作成者の状態の更新に失敗しました",
  already_link: "アカウントはすでにリンクされています。",

  "info_title.required": "タイトルは必須です",
  "info_published_at.before":
    "公開開始日時は公開終了日時よりも前の日時にしてください",
  "info_body.required": "本文は必須です",
  info_failed_delete: "情報の削除に失敗しました。",
  info_failed_create: "情報を作成できませんでした。",
  info_delete_success: "正常に削除されました",

  about_article_content: "記事内容について",
  regarding_recruitment: "記者および編集スタッフの募集について",
  about_advertising: "メディア広告について",
  about_sponsorship_support: "スポンサーシップとサポートについて",
  about_services_functions: "サービスと機能について",
  about_supporters: "サポーターについて",
  applications_groupware: "グループウェア機能の申請およびお問い合わせ",
  inquiries_operating_company: "運営会社へのお問い合わせ",
  other_inquiries: "その他のお問い合わせ",

  "inquiry_name.required": "お名前は必須です",
  "inquiry_content.required": "内容は必須です",
  "inquiry_email_address.required": "メールアドレスは必須です",
  "inquiry_email_address.email": "有効なメールアドレスである必要があります",
  inquiry_no_secretariat_found: "事務局は見つかりませんでした。",

  "weather_area_code.required": "予報区は必須です",
  weather_create_update_failed: "天気予報の追加に失敗しました",
  "weather_sub_area_code.required": "サブフォーキャストゾーンは必須です",

  "organization_member.required": "組織のメンバーが必要です。",
  "organization_member.between":
    "組織メンバーの投稿制限フィールドは 1 から 100 の間でなければなりません。",
  "organization_member.numeric": "組織のメンバーは数字である必要があります。",

  "organization.required": "組織化が必要です。",
  "organization.between":
    "組織の投稿制限フィールドは 1 から 100 の間でなければなりません。",
  "organization.numeric": "組織は数値である必要があります。",

  "post_limit.required": "投稿制限が必要です。",
  "post_limit.between":
    "投稿制限フィールドは 1 から 100 の間でなければなりません。",
  "post_limit.numeric": "投稿制限は数値である必要があります。",

  "provider.required": "プロバイダー欄は必須です。",
  "provider.string": "プロバイダーは有効な文字列でなければなりません。",

  "provider_id.required": "プロバイダーID欄は必須です。",
  "provider_id.string": "プロバイダーIDは有効な文字列でなければなりません。",

  provider_error_updating_links:
    "ソーシャルリンクの更新中にエラーが発生しました。",
  invalid_provider: "無効なプロバイダーです。",

  provider_link: "プロバイダーのリンク解除に成功しました。",
  provider_unlink: "プロバイダーのリンクに成功しました。",

  social_invalid_linking:
    "ログインIDが設定されていない場合、すべてのソーシャルIDの連携を解除することはできません。",
  social_available_linking: "リンクに使用できます。",

  "article_status_enum.draft": "ドラフト",
  "article_status_enum.applying_publish": "Publishの適用",
  "article_status_enum.remand": "さしもどし",
  "article_status_enum.applying_remand_revise": "差し戻しと改訂の適用",
  "article_status_enum.request_edit": "編集を依頼する",
  "article_status_enum.request_delete": "削除依頼",
  "article_status_enum.published": "公開",

  "contributor_status_type_enum.video": "動画",
  "contributor_status_type_enum.blog": "ブログ",

  "event_activity_location_type.free_input": "自由入力",
  "event_activity_location_type.select": "活動場所から選択",

  "event_aggregation_location_type.free_input": "自由入力",
  "event_aggregation_location_type.select": "活動場所から選択",

  "event_late_declaration_enum.not_possible": "申告不可",
  "event_late_declaration_enum.possible": "申告可能",

  "event_no_other_answer_enum.undecided": "選択肢に未定・その他が表示される",
  "event_no_other_answer_enum.not_displayed": "表示されない",

  "event_show_participant_list_enum.can_view": "全員閲覧可能",
  "event_show_participant_list_enum.event_creator":
    "イベント作成者と種目リーダー以上が閲覧可能",

  "gender_enum.no_answer": "無回答",
  "gender_enum.female": "女性",
  "gender_enum.male": "男性",

  "organization_user_status.applying_membership": "入会申請中",
  "organization_user_status.afilliation": "所属」",
  "organization_user_status.applyingForWithdrawal": "退会申請中",
  "organization_user_status.withdrawal": "」退会",

  "revised_article_enum.temporary_save": "一時保存",
  "revised_article_enum.correction_request": "「修正リクエスト」",
  "revised_article_enum.deletion_request": "「削除リクエスト」",

  "team_collect_type_enum.individual_settlement": "個人決済",
  "team_collect_type_enum.item_settlement": "アイテム決済」",

  "user_contributor_status.not_applied": "適用されていません",
  "user_contributor_status.training_inprogress": "「トレーニング進行中」",
  "user_contributor_status.training_completed":
    "「トレーニング完了（承認待ち）」",
  "user_contributor_status.approved": "」承認されました",
};

export const JP_ERROR_MESSAGE_ALT = {
  GENERIC_MAX_ERROR: ":attribute 文字以内でご記入ください",
  GENERIC_REQUIRED: "必須です",
  GENERIC_REQUIRED_ALT: "必須項目です。",
  GENERIC_MAX_CHAR_LIMIT:
    "入力が:attribute文字を超えています。入力内容を短くしてください。",
  GENERIC_CHECKBOX_REQUIRED: "チェック項目にチェックしてください",
  LOGIN_INVALID: "ログインID又はパスワードが違います",
  LOGIN_ID_REQUIRED: "ログインIDは必須です",
  LOGIN_PASSWORD_REQUIRED: "パスワードは必須です",

  LAST_NAME_REQUIRED: JP_ERROR_MESSAGE["family_name.required"],
  FIRST_NAME_REQUIRED: JP_ERROR_MESSAGE["given.required"],
  LAST_NAME_PHONETIC_REQUIRED:
    JP_ERROR_MESSAGE["phonetic_family_name.required."],
  FIRST_NAME_PHONETIC_REQUIRED:
    JP_ERROR_MESSAGE["phonetic_given_name.required"],
  DATE_OF_BIRTH_REQUIRED: "生年月日は必須です",
  POST_CODE_REQUIRED: JP_ERROR_MESSAGE["postal_code.required"],
  POST_CODE_MAX: "郵便番号は10桁で入力してください",
  PROVINCE_REQUIRED: JP_ERROR_MESSAGE["provice.required"],
  ADDRESS_ONE_REQUIRED: JP_ERROR_MESSAGE["address_1.required"],
  ADDRESS_TWO_REQUIRED: JP_ERROR_MESSAGE["address_2.required"],
  ADDRESS_THREE_REQUIRED: JP_ERROR_MESSAGE["address_3.required"],
  MOBILE_PHONE_NUMBER_MAX: JP_ERROR_MESSAGE["mobile_phone_number.max"],
  PHONE_NUMBER_REQUIRED: "電話番号は必須です",
  PHONE_NUMBER_MAX: JP_ERROR_MESSAGE["phone_number.max"],
  PHONE_NUMBER_INVALID: "無効な電話番号です",
  LOGIN_REQUIRED: JP_ERROR_MESSAGE["login_id.required"],
  LOGIN_MAX: JP_ERROR_MESSAGE["login_id.max"],
  LOGIN_UNIQUE: JP_ERROR_MESSAGE["login_id.unique"],
  PASSWORD_REQUIRED: JP_ERROR_MESSAGE["password.required"],
  NICKNAME_MAX: JP_ERROR_MESSAGE["nickname.max"],
  FAVORITE_SPORT_MAX: JP_ERROR_MESSAGE["favorite_sport.max"],
  FAVORITE_GOURMET_MAX: JP_ERROR_MESSAGE["favorite_gourmet.max"],
  CONTRIBUTOR_NAME_REQUIRED_IF:
    JP_ERROR_MESSAGE["contributor_name.required_if"],
  ADVERTISER_NAME_REQUIRED_IF: "記事投稿者名が必要です",

  EMAIL_REQUIRED: JP_ERROR_MESSAGE["email.required"],
  EMAIL_UNIQUE: JP_ERROR_MESSAGE["email.unique"],
  EMAIL_ALREADY_EXISTS: "このメールアドレスは使用されています",
  EMAIL_INVALID_FORMAT: "無効なメール形式",
  PASSWORD_CONFIRMED: "入力されたパスワードと一致しません",
  PASSWORD_MIN_12:
    "パスワードは英数字（大文字含む）を組み合わせた12文字以上で入力してください",
  PASSWORD_INVALID_FORMAT: "無効なパスワード形式",

  ARTICLE_REQUEST_REASON: "変更事由は必須です",

  MIN_12: "パスワードは12文字以上で入力してください",
  INVALID_PASSWORD_FORMAT:
    "パスワードは英数字（大文字含む）を組み合わせた12文字以上で入力してください",
  MAX_100: "最大100文字です",
  RAKUTEN_ID_REQUIRED: "楽天IDが必要です",
  MAX_255: "最大255文字です",
  PROFILE_IMAGE_MAX_SIZE: "ファイルサイズは500KB未満でなければなりません",
  CURRENT_PASSWORD_REQUIRED: "変更前のパスワードは必須です",
  NEW_PASSWORD_REQUIRED: "変更したいパスワードは必須です",
  NEW_PASSWORD_CONFIRM_REQUIRED: "変更したいパスワード（再入力）は必須です",
  IMAGES_MAX_6: "画像は6枚までに制限されています",
  ARTICLE_TITLE_REQUIRED: "記事タイトルは必須です",
  ARTICLE_BODY_REQUIRED: "記事本文は必須です",
  ARTICLE_PUBLISH_START_REQUIRED: "公開開始日時は必須です",
  ARTICLE_PUBLISH_END_REQUIRED: "掲載終了日時は必須です",
  ARTICLE_INVALID_DATE_RANGE: "無効な日付範囲",
  ARTICLE_TERM_AGREEMENT_REQUIRED: "ご同意が必須となります。",
  ARTICLE_CATEGORY_REQUIRED: "１つ以上のカテゴリを指定してください",
  ARTICLE_TAG_REQUIRED: "必須項目です。",
  ARTICLE_TAG_ALREADY_ADDED: "指定されたタグはすでに追加済みです",
  ARTICLE_ORGANIZATION_REQUIRED:
    JP_ERROR_MESSAGE["article_organization.requried"],
  ARTICLE_IMAGE_SINGLE_LIMIT: "画像は5MB以下でアップロードしてください",

  ARTICLE_CONTRIBUTOR_REQUIRED: "記事投稿者名は必須です",
  ARTICLE_CATEGORY_NAME_REQUIRED:
    JP_ERROR_MESSAGE["article_category_name.required"],
  ARTICLE_CATEGORY_SHORT_NAME_MAX:
    JP_ERROR_MESSAGE["article_category_short_name.max"],
  ARTICLE_CATEGORY_COLOR_REQUIRED:
    JP_ERROR_MESSAGE["article_category_color.required"],
  ARTICLE_CATEGORY_COLOR_REGEX:
    JP_ERROR_MESSAGE["article_category_color.regex"],
  ARTICLE_DISPLAY_ORDER_NUMBER_INVALID: "これは有効な番号でなければならない。",
  ARTICLE_PUBLISH_END_AFTER:
    JP_ERROR_MESSAGE["top_article_publish_ended_at.after"],
  INQUIRY_NAME_REQUIRED: "お名前は必須です",
  INQUIRY_NAME_TOO_LONG: "最大文字数100文字を超えています。",
  INQUIRY_MESSAGE_REQUIRED: "内容は必須です",
  TRAINING_TITLE_REQUIRED: "研修タイトルは必須です",
  TRAINING_URL_REQUIRED: "URLは必須です",
  TRAINING_URL_INVALID: "無効なURLです",
  OUTPUT_PERIOD_REQUIRED: "出力期間は必須です",
  OUTPUT_PERIOD_INVALID: "無効な出力期間です",
  INFORMATIONS_TITLE_REQUIRED: "タイトルは必須です",
  INFORMATIONS_RELEASE_PERIOD_START_INVALID:
    "公開開始日時は公開終了日時よりも前の日時にしてください",
  INFORMATIONS_TEXT_REQUIRED: "本文は必須です",
  INFORMATIONS_IMAGE_INVALID: "画像は必須です",

  WEATHER_AREA_CODE_REQUIRED: "予報区は必須です",
  ORGANIZATION_NAME_REQUIRED: "組織名は必須です",
  ORGANIZATION_REPRESENTATIVE_NAME_REQUIRED: "代表者名は必須です",
  ORGANIZATION_PHONE_REQUIRED: "連絡先電話番号は必須です",
  ORGANIZATION_EMAIL_REQUIRED: "連絡先メールアドレスは必須です",
  ORG_PHONE_MAX: "最大文字数30文字を超えています。",
  ORG_EMAIL_MAX: "最大文字数255文字を超えています。",
  ORG_INVALID_PHONE_NUMBER: "電話番号を入力してください。",
  ORG_INVALID_EMAIL_FORMAT: "メールアドレスを入力してください。",
  ALIGN_MEDIA_NAME_REQUIRED: "メディア名は必須です",
  ALIGN_MEDIA_URL_REQUIRED: "メディアURLは必須です",
  ALIGN_MEDIA_DATE_CONDITION:
    "掲載開始日時は掲載終了日時よりも前の日時にしてください",

  TEAM_EVENT_ORGANIZATION_NAME_REQUIRED: "組織は必須です",
  TEAM_EVENT_NAME_REQUIRED: "種目名は必須です",
  TEAM_EVENT_MEMBERS_FEE_REQUIRED: "会費は必須です",

  USERS_SELECTION_REQUIRED: "少なくとも1人のメンバーを選択してください",

  RELEASE_PERIOD_START_REQUIRED: "リリース開始日時は必須です",
  RELEASE_PERIOD_END_REQUIRED: "終了日時は必須です",

  GENERIC_START_DATE_REQUIRED: "表示開始期間は入力してください",
  START_DATE_REQUIRED: "表示開始日は必ず入力してください",
};
